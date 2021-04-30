import { AppConfig } from './config';
export { AppConfig } from './config';

import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('config');

export const API_ENDPOINT_CONFIG: AppConfig = {
    // apiEndpoint: 'https://localhost:44378/'    

    apiEndpoint: 
    //'https://caremanagerstaging.azurewebsites.net/'
   'https://patientengtranscriptionapithirdparty.azurewebsites.net/'
    //'https://localhost:44314/'    
   
  };

