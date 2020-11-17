import { ServiceAddons, Params } from '@feathersjs/feathers';
import { AuthenticationResult, AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { expressOauth, OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
    interface ServiceTypes {
        'authentication': AuthenticationService & ServiceAddons<any>;
    }
}

class Auth0Strategy extends OAuthStrategy {
    async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
        const baseData = await super.getEntityData(profile, existing, params);
        return {
            ...baseData,
            email: profile.email,
            name: profile.name,
            picture: profile.picture
        };
    }
}

class AuthService extends AuthenticationService {
    async getPayload(authResult: AuthenticationResult, params: Params) {

        const payload = await super.getPayload(authResult, params);
        const { user } = authResult;

        payload['https://hasura.io/jwt/claims'] = {
            'x-hasura-allowed-roles': ['user'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${user.id}`
        }

        return payload;
    }
}

export default function (app: Application) {
    const authentication = new AuthService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('auth0', new Auth0Strategy());

    app.use('/authentication', authentication);
    app.configure(expressOauth()); 
} 