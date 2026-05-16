# Voting App Plan - School Student Union Government

An online voting platform for student union elections. This app allows students to cast votes for candidates across various positions.

## Scope Summary
- **Voter Portal**: Student login (ID-based), viewing positions, candidate profiles, and casting votes.
- **Admin Dashboard**: Creating elections, managing positions/candidates, and viewing real-time results.
- **Data Persistence**: Client-side only (localStorage) as per session constraints.
- **Non-Goals**: Real-time server-side synchronization, multi-device persistence, or official authentication integrations (OAuth).

## Assumptions & Open Questions
- **Assumption**: A "Student ID" and "Password" (mocked) will be used for voter login.
- **Assumption**: The first user to access the site or a specific hidden route will act as the "Admin".
- **Question**: Should results be visible to students before the election ends? (Default: Only admin sees live results, students see after "closing").

## Affected Areas
- **Frontend**: All UI components (Shadcn UI), React state management for voting flow.
- **Data**: Mock data structures for Candidates, Votes, and Students.
- **Storage**: `localStorage` to keep track of cast votes and election setup.

## Phases & Deliverables

### Phase 1: Foundation & Data Modeling (frontend_engineer)
- Define TypeScript interfaces for `Election`, `Position`, `Candidate`, `Student`, and `Vote`.
- Create a `useStorage` hook or context to manage `localStorage` persistence.
- Set up basic routing (Home, Login, Admin, Results).

### Phase 2: Voter Experience (frontend_engineer)
- **Login Page**: Simple ID/Password form.
- **Ballot Page**: List of positions with candidate cards (photo, name, manifesto).
- **Voting Logic**: Prevent double-voting (check if `studentId` has already voted for a `positionId`).
- **Confirmation**: Post-vote summary/receipt.

### Phase 3: Admin Dashboard (frontend_engineer)
- **Election Management**: Create/Edit election title and dates.
- **Candidate Management**: Add/Edit/Delete candidates and positions.
- **Results View**: Bar charts/Tables showing vote counts per candidate.
- **Reset/Clear**: Option to wipe data for a new election.

### Phase 4: Polish & Refinement (quick_fix_engineer)
- Add "Election Closed" states.
- Improve UI responsiveness for mobile (students voting on phones).
- Add success/error toasts for voting actions.
- Final styling and "About" section for the student union.

## Constraints
- No external database. All data resides in the browser's `localStorage`.
- All authentication is client-side mock logic.
