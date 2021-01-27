import { isArray, isEmpty, isString } from 'lodash';

export const ACCESS_STATUS = {
  OKE: '200',
  NO_LOGIN: 'NO_LOGIN',
  INTERNAL_SERVER_ERROR_PAGE: '500',
  FORBIDDEN_PAGE: '403',
};

/**
 * how to check role:
 *    [[]]: parent array: OR; child array: AND
 *    with a,b,c are roles:
 *      - [[a], [b]] -> a OR b
 *      - [[a, b]] -> a AND b
 *      - [[a,b], c] -> (a AND b) OR c
 *      - short:
 *          - [a,b,c] -> a OR b OR C,
 *          - [[a, b],c] -> (a AND b) OR C,
 *          - b -> user has the b role
 *
 * @param {[]} userRoles:
 * @param {[[]]} roles :
 */
export const checkRole = (userRoles, roles = []) => {
  if (!userRoles) {
    return ACCESS_STATUS.NO_LOGIN;
  }

  if (isSingleRole(userRoles, roles)) {
    return ACCESS_STATUS.OKE;
  }

  if (isOnlyLoginRole(userRoles, roles)) {
    return ACCESS_STATUS.OKE;
  }

  for (let i = 0; i < roles.length; i++) {
    const allAndRoles = roles[i];
    if (isSingleRole(userRoles, allAndRoles)) {
      return ACCESS_STATUS.OKE;
    }
    if (isArray(allAndRoles)) {
      for (let j = 0; j < allAndRoles.length; j++) {
        const role = allAndRoles[j];
        if (!isSingleRole(userRoles, role)) {
          /* eslint-disable no-continue */

        }
      }
      return ACCESS_STATUS.OKE;
    }
  }

  return ACCESS_STATUS.FORBIDDEN_PAGE;
};

/**
 *
 * @param {array} userRoles user's role after login
 * @param {array} roles role to get permission to run function
 * @param {any} obj if user has permission. this obj will be return, otherwise is undifined
 *
 */
export const withPermission = (userRoles, roles, obj) => {
  if (!obj) {
    return undefined;
  }
  if (checkRole(userRoles, roles) === ACCESS_STATUS.OKE) {
    return obj;
  }
  return undefined;
};

/**
 *
 * @param {*} userRoles
 * @param {*} role
 */
const isSingleRole = (userRoles, role) => {
  if (isString(role) && !isEmpty(role)) {
    return userRoles.indexOf(role) > -1;
  }
  return false;
};

/**
 * page is only need user login
 * @param {array} userRoles
 * @param {array} roles
 */
const isOnlyLoginRole = (userRoles, roles) =>
  userRoles.length > 0 && (!roles || roles.length === 0);
