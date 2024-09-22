"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { Context } from "@components/Clients";

export default function Page() {
  const { user : userData } = useContext(Context);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl font-bold">
              {userData.name}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                User ID
              </h3>
              <Badge variant="secondary" className="text-xs font-mono">
                {userData._id}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Version
              </h3>
              <p className="text-sm">{userData.__v}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
