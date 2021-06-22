import PubNub from 'pubnub';

const uuid = PubNub.generateUUID();
export const pubnub = new PubNub({
  publishKey: 'pub-c-fb8968ed-987a-4710-9631-75f513c162bf',
  subscribeKey: 'sub-c-d1d0b930-c769-11eb-9e40-ea6857a81ff7',
  uuid,
  secretKey: 'sec-c-ZDEwY2VjOWItOTJiYS00YmY5LWIxMDktOTdhMzZmNGNkYTA5',
});


