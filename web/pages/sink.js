import { Layout } from '@/lib/components/common/Layout'
import { Alert } from '@/lib/components/common/Alert'
import { Button, LinkButton } from '@/lib/components/common/Button'
import { Breadcrumb } from '@/lib/components/common/Breadcrumb'
import {
  VolumnIcon,
  MenuIcon,
  SettingsIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  UserIcon,
} from '@/lib/components/common/Icons'

export default function PageSink() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-bold">Heading 2</h2>
          <h3 className="text-2xl">Heading 3</h3>
          <h4 className="text-xl">Heading 4</h4>
          <h5 className="font-bold">Heading 5</h5>
          <h6 className="font-semibold">Heading 6</h6>
        </div>

        <h2 className="text-3xl font-bold">Alerts</h2>
        <Alert>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            necessitatibus temporibus fugit voluptas optio aliquam itaque quidem
            quos assumenda praesentium eius, dolore a libero impedit, nesciunt
            ipsum sunt voluptatum obcaecati!
          </p>
        </Alert>
        <Alert variant="success">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            aperiam earum nostrum veniam harum nemo aliquid beatae quis laborum
            asperiores provident a, reprehenderit enim delectus voluptatibus!
            Consectetur perferendis amet temporibus!
          </p>
        </Alert>
        <Alert variant="warning">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            aperiam earum nostrum veniam harum nemo aliquid beatae quis laborum
            asperiores provident a, reprehenderit enim delectus voluptatibus!
            Consectetur perferendis amet temporibus!
          </p>
        </Alert>
        <Alert variant="danger">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            aperiam earum nostrum veniam harum nemo aliquid beatae quis laborum
            asperiores provident a, reprehenderit enim delectus voluptatibus!
            Consectetur perferendis amet temporibus!
          </p>
        </Alert>

        <h2 className="text-3xl font-bold">Breadcrumb</h2>
        <div className="grid grid-cols-2 items-end">
          <Breadcrumb
            links={[
              { href: '/', name: 'Home' },
              { href: '/sub-1', name: 'Sub 1' },
              { href: '/sub-2', name: 'Sub 2' },
              { href: '/sub-3', name: 'Sub 3' },
              { href: '/sub-4', name: 'Sub 4' },
              { href: '/sub-5', name: 'Sub 5' },
            ]}
          />
        </div>

        <h2 className="text-3xl font-bold">Buttons</h2>

        <h3 className="text-2xl">Normal buttons</h3>

        <div className="flex items-center gap-2">
          <Button>default</Button>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
        </div>

        <h3 className="text-2xl">Disabled buttons</h3>
        <div className="flex items-center gap-2">
          <Button disabled>default</Button>
          <Button disabled variant="primary">
            primary
          </Button>
          <Button disabled variant="secondary">
            secondary
          </Button>
        </div>

        <h3 className="text-2xl">Loading buttons</h3>

        <div className="flex items-center gap-2">
          <Button loading>default</Button>
          <Button loading variant="primary">
            primary
          </Button>
          <Button loading variant="secondary">
            secondary
          </Button>
        </div>

        <h3 className="text-2xl">Icon buttons</h3>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            default <VolumnIcon></VolumnIcon>
          </Button>
          <Button className="flex items-center gap-2" variant="primary">
            primary <MenuIcon></MenuIcon>
          </Button>
          <Button className="flex items-center gap-2" variant="secondary">
            secondary <SettingsIcon></SettingsIcon>
          </Button>

          <Button className="flex items-center gap-2">
            <ChevronUpIcon></ChevronUpIcon> default
          </Button>
          <Button className="flex items-center gap-2" variant="primary">
            <ChevronDownIcon></ChevronDownIcon> primary
          </Button>
          <Button className="flex items-center gap-2" variant="secondary">
            <ChevronLeftIcon></ChevronLeftIcon> secondary
          </Button>
        </div>

        <h3 className="text-2xl">Links buttons</h3>
        <div className="flex items-center gap-2">
          <LinkButton href="#">default</LinkButton>
          <LinkButton href="#" variant="primary">
            primary
          </LinkButton>
          <LinkButton href="#" variant="secondary">
            secondary
          </LinkButton>
        </div>

        <h2 className="text-3xl font-bold">Icons</h2>
        <div className="grid grid-cols-4 items-end gap-2">
          <UserIcon />
          <UserIcon size="32px" />
          <UserIcon size="48px" />
          <UserIcon size="64px" />
          <span>24px (default)</span>
          <span>32px</span>
          <span>48px</span>
          <span>64px</span>
        </div>
      </div>
    </Layout>
  )
}
