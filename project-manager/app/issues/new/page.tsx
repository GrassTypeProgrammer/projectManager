'use client'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

// import IssueForm from '../_components/IssueForm'
// This is related to lazy loading
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage