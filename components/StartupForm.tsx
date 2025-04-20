"use client";
import { useRouter } from "next/navigation";
import { useState, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
        category: formData.get("category") as string,
        pitch,
      };

      // Clear previous errors
      setErrors({});

      // Validate the form data
      await formSchema.parseAsync(formValues);
      // If validation passes, proceed with form submission
      const result = await createPitch(prevState, formData, pitch);
      console.log(result);
      // console.log(formValues);
      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
          variant: "destructive",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into a more usable format
        // const newErrors: Record<string, string> = {};
        // error.errors.forEach((err) => {
        //   if (err.path) {
        //     const fieldName = err.path[0].toString();
        //     newErrors[fieldName] = err.message;
        //   }
        // });
        // setErrors(newErrors as unknown as Record<string, string>);
        // return { ...prevState, error: "Unexpected error", status: "ERROR" };
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "Unexpected error has occured",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "Unexpected error has occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <>
      <form action={formAction} className="startup-form space-y-6">
        <div>
          <label
            htmlFor="title"
            className="startup-form_label block mb-2 font-medium"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input w-full"
            placeholder="Startup Title"
            required
          />
          {errors.title && (
            <p className="startup-form_error text-red-500 mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="startup-form_label block mb-2 font-medium"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea w-full"
            placeholder="Startup Description"
            required
          />
          {errors.description && (
            <p className="startup-form_error text-red-500 mt-1">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="startup-form_label block mb-2 font-medium"
          >
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input w-full"
            placeholder="Startup Category, (Tech, Health, Education) "
            required
          />
          {errors.category && (
            <p className="startup-form_error text-red-500 mt-1">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="link"
            className="startup-form_label block mb-2 font-medium"
          >
            Image Link
          </label>
          <Input
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="startup-form_input w-full"
            placeholder="URL to image "
          />
          {errors.link && (
            <p className="startup-form_error text-red-500 mt-1">
              {errors.link}
            </p>
          )}
        </div>

        <div data-color-mode="light">
          <label
            htmlFor="pitch"
            className="startup-form_label block mb-2 font-medium"
          >
            Pitch
          </label>
          <MDEditor
            style={{ overflow: "hidden", height: 400, borderRadius: 20 }}
            id="pitch"
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["styles"],
            }}
          />
          {errors.pitch && (
            <p className="startup-form_error text-red-500 mt-1">
              {errors.pitch}
            </p>
          )}
        </div>

        {state.status === "ERROR" && (
          <div className="text-red-500">
            {state.error ||
              "There was an error submitting the form. Please check all fields."}
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="startup-form_btn text-white"
        >
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
