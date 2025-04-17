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
import { Suspense } from "react";

interface CardDetailsProps {
  className?: string;
  href?: string;
  avatarSrc: string;
  alt: string;
  title: string;
  description: string;
}

export default async function CardDetails({
  className,
  avatarSrc,
  alt,
  title,
  description,
}: CardDetailsProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className={clsx("cursor-pointer", className)}>
            <CardHeader className="flex items-center">
              <Suspense fallback={<p>loading...</p>}>
                <Avatar className="w-auto h-auto">
                  <AvatarImage
                    className="w-[100px] h-[100px]"
                    src={avatarSrc}
                    alt={alt}
                    width={100}
                    height={100}
                  />
                </Avatar>
              </Suspense>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Avatar className="w-auto h-auto">
                <AvatarImage
                  className="w-[100px] h-[100px]"
                  src={avatarSrc}
                  alt={alt}
                  width={100}
                  height={100}
                />
              </Avatar>
              {title}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
