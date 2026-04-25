"use client";

import * as F from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/shared/SelectField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { STATE_LABELS } from "@/features/semester/semester.constants";
import { formSchema, Props, VALID_TRANSITIONS } from "./FormChangeState.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function FormChangeState({ semester, onSuccess, onClose }: Props) {
  const queryClient = useQueryClient();
  const nextStates = VALID_TRANSITIONS[semester.state];
  const options = nextStates.map((state) => ({
    value: state,
    label: STATE_LABELS[state],
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { state: "" },
  });

  const { mutate: changeState, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      apiClient.patch(`/semester/${semester.id}/state`, {
        state: values.state,
      }),

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
      onSuccess?.();
      onClose();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Opps, algo anda mal");
      }
    },
  });

  if (nextStates.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Este semestre no puede cambiar de estado.
      </p>
    );
  }

  return (
    <F.Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => changeState(values))}
        className="space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          Estado actual:{" "}
          <span className="font-medium">{STATE_LABELS[semester.state]}</span>
        </p>

        <F.FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <F.FormItem>
              <F.FormLabel>Nuevo estado</F.FormLabel>
              <F.FormControl>
                <SelectField
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecciona el nuevo estado"
                />
              </F.FormControl>
              <F.FormMessage />
            </F.FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? "Guardando..." : "Confirmar cambio"}
        </Button>
      </form>
    </F.Form>
  );
}
