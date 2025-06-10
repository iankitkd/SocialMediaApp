import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export type MySocket = Socket<DefaultEventsMap, DefaultEventsMap> | null