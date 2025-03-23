'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title: string,
  description: string,
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');

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
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occurred.');
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')} />
        <Controller
          name='description'
          control={control}
          // The SimpleMDE component doesn't support {...register()} so we need to use the <Controller> component
          render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>

  )
}

export default NewIssuePage