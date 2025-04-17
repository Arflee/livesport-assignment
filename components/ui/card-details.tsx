import { Card, CardContent, CardHeader, CardTitle } from "./card";
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
}

export default async function CardDetails({
  className,
  avatarSrc,
  alt,
  title,
  countryLogoSrc,
}: CardDetailsProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className={clsx("cursor-pointer", className)}>
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="w-auto h-auto">
                <AvatarImage
                  className="w-[100px] h-[100px]"
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
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Avatar className="w-auto h-auto">
                <AvatarImage
                  className="w-[100px] h-[100px]"
                  src={avatarSrc}
                  alt={alt}
                  width={100}
                  height={100}
                />
              </Avatar>
              <Label className="text-2xl">{title}</Label>
            </DialogTitle>
            <DialogDescription>
              <Image
                className="w-[100px] h-[100px]"
                src={countryLogoSrc}
                alt="Country flag"
                width={100}
                height={100}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
