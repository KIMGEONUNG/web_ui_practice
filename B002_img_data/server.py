#!/usr/bin/env python

import asyncio
import websockets
from PIL import Image
from torchvision.transforms import Grayscale
import base64
import io


def pillow_image_to_base64_string(img):
  buffered = io.BytesIO()
  img.save(buffered, format="JPEG")
  return base64.b64encode(buffered.getvalue()).decode("utf-8")


def base64_string_to_pillow_image(base64_str):
  return Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))


async def server(ws: str, path: int):
  print('Im server')
  while True:
    print('Loop starts')

    message: str = await ws.recv()

    # CONVERT DATAURL TO PIL IMAGE
    base64_str = message.split(',')[-1]
    image = base64_string_to_pillow_image(base64_str)

    # PROCESS IN BACKEND
    gray = Grayscale()(image)

    # CONVERT IMAGE TO DATAURL
    base64_image_string = pillow_image_to_base64_string(gray)
    img_data_url = 'data:image/jpeg;base64,' + base64_image_string
    await ws.send(img_data_url)


Server = websockets.serve(server, '127.0.0.1', 5678)
asyncio.get_event_loop().run_until_complete(Server)
asyncio.get_event_loop().run_forever()
