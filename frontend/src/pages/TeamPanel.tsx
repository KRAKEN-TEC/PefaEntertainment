
import { useRef, useState } from "react";
import { Box, Grid, GridItem, Input, Button, Fieldset, HStack, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { GoHomeFill } from "react-icons/go";
import { MdMovieEdit } from "react-icons/md";
import { NavLink } from "react-router";

import { useUser, useUserActions, FormUser, FetchUser, schemaUser, userQuery } from '@/hooks/useUser'
import { useUserStore } from '@/context/useUserStore'
import AlertMessage from "@/components/AlertMessage";
import MultipleSelector from "@/components/MultipleSelector";
import SearchInput from "@/components/SearchInput";

// USER ACTION AND LIST

const UserUpdateForm = ({ user }: { user: FetchUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FetchUser>();
  const { alert, handleUpdate } = useUserActions();

  const onSubmit = (payload: FetchUser) => {
    handleUpdate(payload, user._id);
  }

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>

          <Stack>
            <Fieldset.HelperText>
              Please take your time ... have a greate day!
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Name">
              <Input id="name" {...register('name')} type="text" placeholder={`${user.name}`} />
              {errors.name?.message && <p className="text-danger">{errors.name?.message}</p>}
            </Field>

            <Field label="Email">
              <Input id="email" {...register('email')} type="email" placeholder={`${user.email}`} />
              {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
            </Field>

            <Field label="Password">
              <Input id="password" {...register('password')} type="password" placeholder="(leave blank if not change)" />
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
            </Field>
          </Fieldset.Content>

          <DialogFooter><Button type='submit'>Update</Button></DialogFooter>
        </Fieldset.Root>
      </form>
    </>
  );
}

const UserUpdate = ({ children, user }: { children: React.ReactNode, user: FetchUser }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"}>
      <DialogTrigger asChild>
        <Button variant="plain" _hover={{ color: "cyan" }} color="blue">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Update Team Member</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <UserUpdateForm user={user} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

const UserAction = ({ user }: { user: FetchUser }) => {
  const { accessToken, handleDelete } = useUserActions();

  const onClick = async () => {
    handleDelete(user._id);
  };

  return (
    <>
      {/* if token present, use TableCell UserAction, else use TableCell of Edit and Delete buttons which are dimm */}
      {accessToken ?
        <HStack>
          <UserUpdate user={user}>Edit</UserUpdate>
          <Button variant="plain" _hover={{ color: "cyan" }} color="red" onClick={onClick}>
            Delete
          </Button>
        </HStack>
        :
        <HStack>
          <Button variant="plain" color="gray" _hover={{ textDecoration: "underline" }} onClick={() => window.alert("You need to login first")}>
            Edit
          </Button>
          <Button variant="plain" color="gray" _hover={{ textDecoration: "underline" }} onClick={() => window.alert("You need to login first")}>
            Delete
          </Button>
        </HStack>
      }
    </>
  )
}

const UserList = ({ userQuery }: { userQuery: userQuery }) => {
  const { data: users, loading } = useUser(userQuery)

  return (
    <Table.ScrollArea height="560px">
      <TableRoot stickyHeader>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Name</TableColumnHeader>
            <TableColumnHeader>Email</TableColumnHeader>
            <TableColumnHeader>Phone</TableColumnHeader>
            <TableColumnHeader>Role</TableColumnHeader>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading &&
            <TableRow>
              <TableCell><Spinner /></TableCell>
            </TableRow>}

          {users.map(user =>
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell><UserAction user={user} /></TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableRoot>
    </Table.ScrollArea>
  )
}

// ADD USER

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormUser>({ resolver: zodResolver(schemaUser) });
  const { alert, loading, handleRegister } = useUserActions();

  const onSubmit = (payload: FormUser) => {
    handleRegister(payload);
  }

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Stack>
            <Fieldset.HelperText>
              Welcome abord! Please provide your contact details below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <Field label="Name">
              <Input id="name" {...register('name', { required: true })} type="text" placeholder="name" />
              {errors.name?.message && <p className="text-danger">{errors.name?.message}</p>}
            </Field>

            <Field label="Email">
              <Input id="email" {...register('email', { required: true })} type="email" placeholder="example@gmail.com" />
              {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
            </Field>

            <Field label="Phone">
              <Input id="phone" {...register('phone', { required: true })} type="phone" placeholder="Can be empty" />
              {errors.phone?.message && <p className="text-danger">{errors.phone?.message}</p>}
            </Field>

            <Field label="Password">
              <Input id="password" {...register('password', { required: true })} type="password" placeholder="Abcdefg123*..." />
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
            </Field>

          </Fieldset.Content>

          {loading ?
            <Button disabled>
              Register...
            </Button>
            :
            <Button type='submit'>
              Register
            </Button>
          }
        </Fieldset.Root >
      </form>
    </>
  )
}

const AddUser = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"}>
      <DialogTrigger asChild>
        <Button>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Team Registration</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <UserForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

// LOG IN AND LOG OUT

const UserLogout = ({ children }: { children: React.ReactNode }) => {
  const { handleLogout } = useUserActions();
  return (
    <>
      <Box>
        <Button onClick={handleLogout}>{children}</Button>
      </Box>
    </>
  )
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FetchUser>();
  const { alert, handleLogin } = useUserActions();

  const onSubmit = async (payload: FetchUser) => {
    handleLogin(payload);
  };

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      {/* Logging In Form */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend>Welcome, Ma'am/Sir...</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your email and password below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>

            <Field label="Email">
              <Input id="email" {...register('email', { required: true })} type="email" placeholder="email" />
              {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
            </Field>

            <Field label="Password">
              <Input id="password" {...register('password', { required: true })} type="password" placeholder="password" />
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
            </Field>

          </Fieldset.Content>
          <Button type='submit'>
            Log In
          </Button>
        </Fieldset.Root>
      </form>
    </>
  )
}

const UserLogin = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"}>
      <DialogTrigger asChild>
        <Button>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <LoginForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

function TeamPanel() {
  const { accessToken } = useUserStore();
  const [userQuery, setUserQuery] = useState<userQuery>({} as userQuery)

  const users = [
    { _id: "admin", role: "Admin" },
    { _id: "user", role: "User" },
    { _id: "editor", role: "Editor" },
    { _id: "moderator", role: "Moderator" }
  ]

  return (
    <Grid
      templateAreas={{
        base: `"buttons" "list"`,  // Stack nav, form, and list in one column for small screens
        lg: `"buttons buttons" "list list"`,  // In large screens, side by side
        md: `"buttons buttons buttons" "list list list"`,
        sm: `"buttons buttons buttons buttons" "list list list list"`,
      }}

      templateColumns={{
        base: '1fr',
        md: '1fr',
        sm: '1fr'
      }}

      padding={3}
    >
      {/* BUTTONS */}
      <GridItem area="buttons" >
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>
          <NavLink to="/">
            <GoHomeFill size={"30px"} />
          </NavLink>
          <NavLink to="/admin/movie-panel">
            <MdMovieEdit size={"31px"} />
          </NavLink>
          {accessToken ? <UserLogout>Log Out</UserLogout> : <UserLogin>Log In</UserLogin>}
          <AddUser>Add Team Member</AddUser>
          <MultipleSelector labelName="role" placeholderName="Roles" data={users} onValueChange={(selected: any) => setUserQuery({ ...userQuery, roles: selected })} />
          <SearchInput placeholderName="users by email" onSubmit={(payload) => setUserQuery({ ...userQuery, search: payload.searchName })} />
        </Stack>
      </GridItem>

      {/* USER LIST */}
      <GridItem area="list">
        <UserList userQuery={userQuery} />
      </GridItem>

    </Grid>
  )
}

export default TeamPanel