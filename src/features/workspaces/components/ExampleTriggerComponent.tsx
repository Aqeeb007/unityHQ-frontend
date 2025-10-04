// Example usage of the modal store in any component

import { Button } from '@/components/ui/button';
import { useModalStore } from '../stores';

export const ExampleTriggerComponent = () => {
  const { openModal } = useModalStore();

  return (
    <Button onClick={openModal}>
      Create New Workspace
    </Button>
  );
};

/*
How to use the modal store in your components:

1. Import the store:
   import { useModalStore } from '@/features/workspaces/stores';

2. Access store methods:
   const { openModal, closeModal, isOpen } = useModalStore();

3. Open the modal from anywhere:
   <Button onClick={openModal}>Open Modal</Button>

4. The CreateWorkSpaceModal component will automatically show/hide based on the store state.

5. Make sure to include the CreateWorkSpaceModal component in your app:
   <CreateWorkSpaceModal />
*/