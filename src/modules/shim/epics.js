import { ofType, combineEpics } from 'redux-observable';
import { map, tap, ignoreElements, flatMap, catchError, mergeMap, first, mapTo } from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';

import { EndUserAPI } from '../../api/endUser';
import * as AuthActions from '../auth/actions';
import * as UIActions from '../ui/actions';
import { IframeViews } from '../ui/constants';
import * as OrgActions from '../org/actions';
import { ActionTypes as OrgActionTypes } from '../org/constants';
import { getAllowedDomains } from '../org/selectors';
import * as ShimActions from './actions';
import { ActionTypes as ShimActionTypes } from './constants';
import * as SharedEventTypes from '../../shared/eventTypes';
import { makeDomainMatcher } from '../../shared/helpers';
import { INFO_MSG_CLASSNAME } from '../../shared/iframeClasses';


const startAuthFlowEpic = action$ => action$.pipe(
    ofType(SharedEventTypes.START_AUTH_FLOW),
    map(({ payload }) => UIActions.setViewAndType({ view: IframeViews.AUTH_MODAL, type: payload }))
);

const verifyDomain = (action$, state$) => action$.pipe(
    ofType(ShimActionTypes.verifyDomain),
    flatMap(({ payload }) => {
        return action$.pipe(
            ofType(OrgActionTypes.fetchPublicOrgSuccess),
            mergeMap(() => {
                const domains = getAllowedDomains(state$.value);
                const allowed = domains.length === 0 || domains.some(makeDomainMatcher(payload.host));
                if (!allowed) {
                    return [
                        { type: SharedEventTypes.DOMAIN_NOT_ALLOWED },
                        ShimActions.verifyDomainFailed()
                    ];
                } else {
                    return [ShimActions.verifyDomainSuccess()];
                }
            }),
        );
    }),
);

const verifyDomainFailed = action$ => action$.pipe(
    ofType(ShimActionTypes.verifyDomainFailed),
    mergeMap(() => ([
        UIActions.setViewAndType({ view: IframeViews.INFO_MSG, type: ShimActionTypes.verifyDomainFailed }),
        UIActions.changeContainerClass(INFO_MSG_CLASSNAME)
    ])),
);

const startWidgetBootstrap = (action$) => action$.pipe(
    ofType(SharedEventTypes.INIT_IFRAME),
    mergeMap(({ payload }) => {
        global.clientId = payload.clientId;
        return [
            OrgActions.fetchPublicOrg({ clientId: payload.clientId }),
            ShimActions.verifyDomain({ host: payload.topHost }),
            ShimActions.fetchCurrentUser(payload.jwt)
        ];
    }),
);

const setEndUserAttribute = (action$) => action$.pipe(
    ofType(SharedEventTypes.SET_END_USER_ATTRIBUTE),
    tap(({ payload: { token, name, value, type = 'STRING' } }) => EndUserAPI.setAttribute(token, name, value, type)),
    ignoreElements(),
);


const getCurrentUser = action$ => action$.pipe(
    ofType(SharedEventTypes.GET_CURRENT_USER_VIA_JWT),
    flatMap(({ payload }) =>
        from(EndUserAPI.getMe(payload))
            .pipe(
                flatMap((response) => from(response.json())),
                flatMap(({ data }) => of(AuthActions.fetchCurrentUserSuccess(data))),
                catchError(err => of(AuthActions.fetchCurrentUserFailed(err))),
            )
    )
);

const getCurrentUserDone = action$ => action$.pipe(
    ofType(SharedEventTypes.FETCH_CURRENT_USER_SUCCESS, SharedEventTypes.FETCH_CURRENT_USER_FAILED),
    ignoreElements()
);

const bootstrapping = action$ => action$.pipe(
    ofType(SharedEventTypes.INIT_IFRAME),
    mergeMap(() => {
        const fetchOrgSuccess = action$.pipe(
            ofType(OrgActionTypes.fetchPublicOrgSuccess),
            first(),
        );

        const verifyDomainSuccess = action$.pipe(
            ofType(ShimActionTypes.verifyDomainSuccess),
            first(),
        );

        const getCurrentUserDone = action$.pipe(
            ofType(SharedEventTypes.FETCH_CURRENT_USER_SUCCESS, SharedEventTypes.FETCH_CURRENT_USER_FAILED),
            first(),
        );

        return forkJoin([
            fetchOrgSuccess,
            verifyDomainSuccess,
            getCurrentUserDone
        ])
            .pipe(
                first(),
                mapTo({ type: SharedEventTypes.BOOTSTRAP_DONE })
            );
    }),
);

export default combineEpics(
    startAuthFlowEpic,
    startWidgetBootstrap,
    setEndUserAttribute,
    getCurrentUser,
    getCurrentUserDone,
    verifyDomain,
    verifyDomainFailed,
    bootstrapping,
);
