import { Card, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import clsx from "clsx";
import Image from "next/image";
import { Label } from "./label";

interface CardDetailsProps {
  className?: string;
  href?: string;
  avatarSrc: string;
  alt: string;
  title: string;
  countryLogoSrc: string;
  countryName: string;
  gender: string;
  teamName: string;
  isPlayer: boolean;
  sportName: string;
}

export default async function CardDetails({
  className,
  avatarSrc,
  alt,
  title,
  countryLogoSrc,
  countryName,
  gender,
  teamName,
  isPlayer,
  sportName,
}: CardDetailsProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className={clsx("cursor-pointer", className)}>
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="w-auto h-auto">
                <AvatarImage
                  className="w-[75px] h-[75px]"
                  src={avatarSrc}
                  alt={alt}
                  width={100}
                  height={100}
                />
              </Avatar>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center space-x-2">
            <Avatar className="w-auto h-auto">
              <AvatarImage
                className="w-[100px] h-[100px]"
                src={avatarSrc}
                alt={alt}
                width={100}
                height={100}
              />
            </Avatar>
            <DialogTitle>{title}</DialogTitle>
            <table className="table-fixed w-full">
              <thead className="max-w-[100px]">
                <tr>
                  <th>
                    <Image
                      className="w-[100px] h-[100px]"
                      src={countryLogoSrc}
                      alt="Country flag"
                      width={100}
                      height={100}
                    />
                  </th>
                  <th>
                    <Label>Gender</Label>
                  </th>
                  {isPlayer && (
                    <>
                      <th>
                        <Label>Team</Label>
                      </th>
                      <th>
                        <Label>Sport name</Label>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <DialogDescription>{countryName}</DialogDescription>
                  </td>
                  <td>
                    <DialogDescription>{gender}</DialogDescription>
                  </td>
                  {isPlayer && (
                    <>
                      <td>
                        <DialogDescription>{teamName}</DialogDescription>
                      </td>
                      <td>
                        <DialogDescription>{sportName}</DialogDescription>
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
