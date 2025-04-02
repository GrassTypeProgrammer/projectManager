'use client';

import ErrorMessage from '@/app/components/errorMessage';
import Spinner from '@/app/components/spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

// This creates the type based on the IssueSchema
type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue,
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        // edit
        await axios.patch('/api/issues/' + issue.id, data)
      }
      else {
        // If your http call might be reused elsewhere or is becoming complex, extract it to it's own module.
        // create new
        await axios.post('/api/issues', data);
      }

      router.push('/issues');
      // Refresh contents of current route
      router.refresh();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      setError('An unexpected error occurred.');
      setIsSubmitting(false);
    }
  })

  return (
    <div className='max-w-xl '>
      {error &&
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }

      <form
        className=' space-y-3'
        onSubmit={onSubmit}
      >
        <ErrorMessage >
          {errors.title?.message}
        </ErrorMessage>
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />

        <ErrorMessage >
          {errors.description?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          // The SimpleMDE component doesn't support {...register()} so we need to use the <Controller> component
          render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
        />


        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>

  )
}

export default IssueForm