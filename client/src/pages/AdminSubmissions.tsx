
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { ContactSubmission } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminSubmissions() {
  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact'],
  });
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
       <Link href="/admin/dashboard" className={`${buttonVariants({ variant: "outline" })} mb-4`}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading submissions...</div>
          ) : submissions && submissions.length > 0 ? (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[22%]">Email</TableHead>
                  <TableHead className="w-[12%]">Company</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead className="w-[32%]">Message</TableHead>
                  <TableHead>Submitted At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...submissions]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((submission) => {
                    const isNew =
                      Date.now() - new Date(submission.createdAt).getTime() <
                      24 * 60 * 60 * 1000;
                    return (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{submission.name}</span>
                        {isNew && (
                          <Badge className="bg-green-100 text-green-800">NEW</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="w-[22%]"><div className="truncate" title={submission.email}>{submission.email}</div></TableCell>
                    <TableCell className="w-[12%]"><div className="truncate" title={submission.company || 'N/A'}>{submission.company || 'N/A'}</div></TableCell>
                    <TableCell>
                      <Badge variant="secondary">{submission.projectType || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>{submission.budget || 'N/A'}</TableCell>
                    <TableCell>{submission.timeline || 'N/A'}</TableCell>
                    <TableCell className="align-top w-[32%]">
                      <div className="flex items-start gap-2">
                        <div className="truncate" style={{ maxWidth: "100%" }}>
                          {submission.message}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0"
                          aria-label="View full message"
                          onClick={() => { setSelectedSubmission(submission); setIsMessageOpen(true); }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No contact form submissions yet.
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submission Message</DialogTitle>
            <DialogDescription>
              From {selectedSubmission?.name} ({selectedSubmission?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="whitespace-normal break-words text-sm text-gray-800" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {selectedSubmission?.message}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
