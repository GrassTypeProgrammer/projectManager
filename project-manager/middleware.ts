// A middleware function directs the user to the login page if they try to access a page that you need to be logged in for

// Middleware function provided by next-auth. 
export {default} from 'next-auth/middleware';

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id+'
    ]
}