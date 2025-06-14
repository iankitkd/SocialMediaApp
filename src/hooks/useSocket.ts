import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useUserStore } from '@/lib/store/userStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export function useSocket() {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const {_id: userId} = useUserStore();
  console.log(userId, "uii")

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      // transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(socketIo);

    // register user for showing online status
    socketIo.emit("register", userId);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};