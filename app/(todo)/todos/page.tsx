import Link from 'next/link';

import { todoRoutes } from '@/lib/router';
import { TodosList } from '@/widgets';

export default async function TodosPage() {
  return (
    <>
      <div className="flex">
        <Link href={todoRoutes.Add}>Add new todo</Link>
      </div>

      <TodosList />
    </>
  );
}
