import { Avatar, AvatarFallback } from "../ui/avatar";

export function UserAvatar({ name }: { name?: string }) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarFallback className="rounded-lg">{name?.[0] ?? "?"}</AvatarFallback>
    </Avatar>
  );
}
