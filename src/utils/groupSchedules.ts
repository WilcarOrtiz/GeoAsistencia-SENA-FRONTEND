import {
  ClassDay,
  GroupedSchedule,
} from "@/features/classGroup/ClassGroup.type";

export function groupClasssDays(classDays: ClassDay[]): GroupedSchedule[] {
  const map = new Map<string, GroupedSchedule>();

  for (const cd of classDays) {
    const key = `${cd.start_time}-${cd.end_time}`;
    if (map.has(key)) {
      map.get(key)!.days.push(cd.day);
    } else {
      map.set(key, {
        days: [cd.day],
        start_time: cd.start_time,
        end_time: cd.end_time,
      });
    }
  }

  return Array.from(map.values());
}
