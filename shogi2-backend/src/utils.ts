import os from "os";
import { Pos } from "shogi2-types";

export function getLocalIpAddress(localhost:boolean): string | null {
  if (localhost){
    return "localhost";
  }else{
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
      const networkInterface = interfaces[interfaceName];
      if (!networkInterface) continue;

      for (const iface of networkInterface) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return null;
  }
}

export function cmp_pos(p1:Pos,p2:Pos):boolean{
  return p1.x===p2.x && p1.y===p2.y;
}
