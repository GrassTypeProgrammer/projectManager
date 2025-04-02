import { Button } from '@radix-ui/themes'

const DeleteIssueButton = ({issueID}: {issueID: number}) => {
  return (
    <Button color='red'>Delete Issue</Button>
  )
}

export default DeleteIssueButton