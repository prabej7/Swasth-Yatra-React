import React, { useEffect, useRef } from 'react';
const SimplePeer = require('simple-peer');

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  let peer: any; // Define peer as any to avoid TypeScript errors

  useEffect(() => {
    const initializePeer = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('getUserMedia is not supported');
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // @ts-ignore
        peer = new SimplePeer({ initiator: true, stream });
        peer.on('signal', (data: any) => {
          // Send signaling data to remote peer
        });
        peer.on('stream', (remoteStream: any) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializePeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoCall;
