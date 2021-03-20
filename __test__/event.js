exports.eventFakerObj = (override) => {
  const obj = {
    client_msg_id: '5768ffbf-9f02-4253-93a4-3cb71b4a79ve',
    text: 'hello @devson',
    user: 'U71VOL7FZGB',
    channel: 'C01P98WQGTS',
  };
  return {
    ...obj,
    ...override,
  };
};
