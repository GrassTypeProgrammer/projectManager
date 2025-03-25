'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/errorMessage';
import Spinner from '@/app/components/spinner';

// This creates the type based on the createIssueSchema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl '>
      {error &&
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }

      <form
        className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
          }
          catch (error) {
            setError('An unexpected error occurred.');
            setIsSubmitting(false);
          }
        })}
      >

        <ErrorMessage >
          {errors.title?.message}
        </ErrorMessage>
        <TextField.Root placeholder='Title' {...register('title')} />


        <ErrorMessage >
          {errors.description?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          // The SimpleMDE component doesn't support {...register()} so we need to use the <Controller> component
          render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
        />


        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>

  )
}

export default NewIssuePage