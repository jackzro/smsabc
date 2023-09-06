export const exheadersRequest = (config) => {
  return {
    ApiKey: config.get('API_KEY_VOICE_OTP'),
    ApiToken: config.get('API_TOKEN_VOICE_OTP'),
    Sid: config.get('SID'),
  };
};

export const headersRequestMDN = (config) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(
      config.get('MDN_USERNAME') + ':' + config.get('MDN_PASSWORD'),
    )}`,
  };
};
