#!/usr/bin/env python

import asyncio
import websockets


async def server(ws: str, path: int):
  print('Im server')
  while True:
    print('Loop starts')
    message = await ws.recv()
    print(f'Get Msg [{message}]')
    await ws.send(f"Im server with {message}")


Server = websockets.serve(server, '127.0.0.1', 5678)
asyncio.get_event_loop().run_until_complete(Server)
asyncio.get_event_loop().run_forever()
