import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useUserStore } from '@/lib/store/userStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export function useSocket() {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const {_id: userId} = useUserStore();

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      // transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (socket && userId) {
      // register user for showing online status
      socket.emit("register", userId);
    }
  }, [socket, userId]);

  return socket;
};