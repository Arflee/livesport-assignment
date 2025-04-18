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
                className="w-[100px]"
                src={avatarSrc}
                alt={alt}
                width={100}
                height={100}
              />
            </Avatar>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div
            className={clsx(
              "w-full grid grid-cols-1 *:grid gap-2 *:text-center *:justify-center *:items-center",
              isPlayer ? "*:grid-cols-4" : "*:grid-cols-3"
            )}
          >
            <div className="*:font-medium *:text-accent-foreground">
              <Image
                className="w-[100px] mx-auto"
                src={countryLogoSrc}
                alt="Country flag"
                width={100}
                height={100}
              />
              <DialogDescription>Gender</DialogDescription>
              {isPlayer && <DialogDescription>Team</DialogDescription>}
              <DialogDescription>Sport name</DialogDescription>
            </div>
            <div>
              <DialogDescription>{countryName}</DialogDescription>
              <DialogDescription>{gender}</DialogDescription>
              {isPlayer && <DialogDescription>{teamName}</DialogDescription>}
              <DialogDescription>{sportName}</DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
