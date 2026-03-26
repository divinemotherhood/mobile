import { MMKV } from 'react-native-mmkv';
declare const global: any;
const supportsJsi = typeof global.nativeCallSyncHook !== 'undefined';

let maybeMmkv: any = null;

if (supportsJsi) {
  try {
    maybeMmkv = new MMKV({
      id: 'divine_motherhood_storage',
    });
  } catch (error) {
    console.warn('MMKV init failed:', error);
  }
} else {
  console.warn('MMKV not supported in this runtime (remote debugger). Using fallback in-memory store.');
}

const fallback = {
  set: (_key: string, _value: string) => undefined,
  getString: (_key: string) => undefined,
  delete: (_key: string) => undefined,
  setString: (_key: string, _value: string) => undefined,
};

export const mmkv = maybeMmkv || fallback;

export const TOKEN_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};
