import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { type Job } from "@shared/schema";
import { Loader2 } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  resume: z.instanceof(FileList).refine(files => files?.length === 1, "Resume is required."),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export default function JobApplicationModal({ isOpen, onClose, job }: JobApplicationModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/jobs/${job?.id}/apply`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Application submission failed");
      }
      return response.json();
    },
    onSuccess: () => {
      alert("Application submitted successfully!");
      reset();
      onClose();
    },
    onError: () => {
      alert("Failed to submit application. Please try again.");
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    if (!job) return;

    const formData = new FormData();
    formData.append("applicantName", data.name);
    formData.append("applicantEmail", data.email);
    if (data.phone) {
      formData.append("applicantPhone", data.phone);
    }
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }
    
    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {job?.title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder="Email Address" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="Phone Number (Optional)" {...register("phone")} />
          </div>
          <div>
            <label htmlFor="resume" className="text-sm font-medium">Resume/CV</label>
            <Input id="resume" type="file" {...register("resume")} accept=".pdf,.doc,.docx" />
            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}