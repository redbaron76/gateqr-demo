import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import type { FieldMeta } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/client";
import { createFileRoute } from "@tanstack/react-router";
import { log } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import useTranslate from "@/hooks/useTranslate";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

type FieldMetaType = {
  meta: FieldMeta;
  min?: number;
};

const FieldInfo: React.FC<FieldMetaType> = ({ meta, min }) => {
  const { t } = useTranslate();

  return meta.isTouched && meta.errors.length ? (
    <div className="text-red-500 text-xs p-1">
      {meta.isValidating
        ? t("label.validatiing")
        : t(`server.signupSchema.${meta.errors[0]}`, { min })}
    </div>
  ) : null;
};

function Signup() {
  const { t } = useTranslate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value: { email, password } }) => {
      const response = await api.signup.$post({
        json: {
          email,
          password,
        },
      });

      log(response, "RESPONSE");
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <div className="flex flex-col flex-grow items-center justify-center bg-gradient-to-b from-slate-200 to-white">
      <div className="container flex flex-col flex-grow items-center justify-center gap-5 md:gap-20 md:py-14">
        <h2 className="font-bold text-2xl">{t("signup.title")}</h2>
        <form
          className="grid gap-8 min-w-72 border-4 border-dashed border-neutral-400 p-8 bg-neutral-100 rounded-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="email"
              validators={{
                onChange: z.string().email({ message: "email" }),
              }}
              children={(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>{t("signup.email")}</Label>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo meta={field.state.meta} />
                </div>
              )}
            />
          </div>
          <div>
            <form.Field
              name="password"
              validators={{
                onChange: z.string().min(8, {
                  message: t("password", {
                    min: 8,
                  }),
                }),
              }}
              children={(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>{t("signup.password")}</Label>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo meta={field.state.meta} min={8} />
                </div>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting && (
                  <ArrowPathIcon className="size-4 mr-1 text-neutral-300 animate-spin" />
                )}
                {isSubmitting ? t("signup.submitting") : t("signup.submit")}
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
