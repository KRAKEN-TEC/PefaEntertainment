import { useRef, useState } from "react";
import { Text, Box, GridItem, Input, Button, Fieldset, HStack, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner, Stack, Spacer, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, DialogFooter, } from "@/components/ui/dialog";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { useUser, useUserActions, FormUser, FetchUser, schemaUser, userQuery, } from "@/hooks/useUser";
import { useUserStore } from "@/context/useUserStore";
import { useRole } from "@/hooks/useRole";
import AlertMessage from "@/components/global/AlertMessage";
import MultipleSelector from "@/components/global/MultipleSelector";
import AdminNavLink from "@/components/global/AdminNavLink";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import DarkMode from "@/components/DarkMode";
import AddRole from "@/components/global/AddRole";
import RoleUpdateField from "@/components/global/RoleUpdateField";
// USER ACTION AND LIST

const UserUpdateForm = ({ user }: { user: FetchUser }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FetchUser>();
  const { alert, handleUpdate } = useUserActions();

  const onSubmit = (payload: FetchUser) => {
    handleUpdate(payload, user._id);
  };

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
              <Input id="name"  {...register("name")} type="text" placeholder={`${user.name}`} />
              {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
            </Field>

            <Field label="Email">
              <Input id="email" {...register("email")} type="email" placeholder={`${user.email}`} />
              {errors.email?.message && (<p className="text-danger">{errors.email?.message}</p>)}
            </Field>

            <Field label="Phone Number">
              <Input id="phone" {...register("phone")} type="phone" placeholder={`${user.phone}`} />
              {errors.phone?.message && (<p className="text-danger">{errors.phone?.message}</p>)}
            </Field>

            <Field label="Password">
              <Input id="password" {...register("password")} type="password" placeholder="(leave blank if not change)" />
              {errors.password?.message && (<p className="text-danger">{errors.password?.message}</p>)}
            </Field>
          </Fieldset.Content>

          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </Fieldset.Root>
      </form>
    </>
  );
};

const UserUpdate = ({ children, user, }: { children: React.ReactNode; user: FetchUser; }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"} >
      <DialogTrigger asChild>
        <Button variant="plain" _hover={{ color: "cyan" }} color="blue">
          {children}
        </Button>
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
  );
};

const UpdateUserRole = ({ children, user, }: { children: React.ReactNode; user: FetchUser }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormUser>();
  const { alert, handleUpdate } = useUserActions();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (payload: FormUser) => {
    handleUpdate(payload, user._id);
  };

  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"} size={"lg"}>
      <DialogTrigger asChild>
        <Button variant="plain" _hover={{ color: "cyan" }} color="blue">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Assing Role</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          {alert && <AlertMessage message={alert} />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>
              <RoleUpdateField register={register} errors={errors} document={user} />
              <DialogFooter>
                <Button type="submit">Assign</Button>
              </DialogFooter>
            </Fieldset.Root>
          </form>
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
      {accessToken ? (
        <HStack>
          <UserUpdate user={user}>Edit</UserUpdate>
          <UpdateUserRole user={user}>Role</UpdateUserRole>
          <Button variant="plain" _hover={{ color: "cyan" }} color="red" onClick={onClick} >
            Delete
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Button variant="plain" color="gray" _hover={{ textDecoration: "underline" }} onClick={() => window.alert("You need to login first")} >
            Edit
          </Button>
          <Button variant="plain" color="gray" _hover={{ textDecoration: "underline" }} onClick={() => window.alert("You need to login first")}  >
            Delete
          </Button>
        </HStack>
      )}
    </>
  );
};

const UserList = ({ userQuery }: { userQuery: userQuery }) => {
  const { data: users, error, loading } = useUser(userQuery);

  return (
    <>
      <Table.ScrollArea height={users?.length ? "560px" : "auto"}>
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role.title}</TableCell>
                <TableCell>
                  <UserAction user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Table.ScrollArea>

      {error && <Text fontSize="6xl" textAlign="center" mt="20vh">   {error}</Text>}

      {loading &&
        <Box display={"flex"} justifyContent={"center"} alignItems="center" height="50vh" >
          <Spinner size="xl" />
        </Box>
      }
    </>
  );
};

// ADD USER
const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormUser>({ resolver: zodResolver(schemaUser) });
  const { alert, loading, handleRegister } = useUserActions();

  const onSubmit = (payload: FormUser) => {
    handleRegister(payload);
  };

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
              <Input id="name" {...register("name", { required: true })} type="text" placeholder="name" />
              {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
            </Field>

            <Field label="Email">
              <Input id="email" {...register("email", { required: true })} type="email" placeholder="example@gmail.com" />
              {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
            </Field>

            <Field label="Phone">
              <Input id="phone" {...register("phone", { required: true })} type="phone" placeholder="Can be empty" />
              {errors.phone?.message && <p className="text-danger">{errors.phone?.message}</p>}
            </Field>

            <Field label="Password">
              <Input id="password" {...register("password", { required: true })} type="password" placeholder="Abcdefg123*..." />
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
            </Field>
          </Fieldset.Content>

          {loading ? (
            <Button disabled>Register...</Button>
          ) : (
            <Button type="submit">Register</Button>
          )}

        </Fieldset.Root>
      </form>
    </>
  );
};

const AddUser = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"} >
      <DialogTrigger asChild>
        <Button>{children}</Button>
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
  );
};

// LOG IN AND LOG OUT
export const UserLogout = ({ children }: { children: React.ReactNode }) => {
  const { handleLogout } = useUserActions();
  return (
    <>
      <Box>
        <Button onClick={handleLogout} colorPalette={"red"} variant={"subtle"}>
          {children}
        </Button>
      </Box>
    </>
  );
};

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
              <Input id="email" {...register("email", { required: true })} type="email" placeholder="email" />
              {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
            </Field>

            <Field label="Password">
              <Input id="password"{...register("password", { required: true })} type="password" placeholder="password" />
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
            </Field>
          </Fieldset.Content>
          <Button type="submit">Log In</Button>
        </Fieldset.Root>
      </form>
    </>
  );
};

export const UserLogin = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"}>
      <DialogTrigger asChild>
        <Button colorPalette={"blue"} variant={"subtle"}>{children}</Button>
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
  );
};

function TeamPanel() {
  const { accessToken } = useUserStore();
  const [userQuery, setUserQuery] = useState<userQuery>({} as userQuery);
  const { data: users } = useUser(userQuery);
  const { data: roles } = useRole();

  const nextPage = () => {
    setUserQuery({ ...userQuery, page: userQuery.page + 1 })
  }

  const prevPage = () => {
    setUserQuery({ ...userQuery, page: userQuery.page - 1 })
  }

  return (
    <>
      {/* NAV */}
      <GridItem area="nav">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3} >
          {/* ADMIN PANEL LINKS*/}
          <AdminNavLink />

          <Spacer />

          {/* SORT SEARCH FILTERS */}
          <MultipleSelector
            labelName="title"
            placeholderName="Roles"
            data={roles}
            onValueChange={(selected: any) => {
              setUserQuery({ ...userQuery, roleIds: selected })
            }
            }
          />

          <AdminSearchInput
            placeholderName=" by email"
            onSubmit={(payload) => setUserQuery({ ...userQuery, search: payload.searchName })}
          />

          {/* ADD MEMBERS */}
          <AddUser>Member Register</AddUser>

          {/* ROLES */}
          <AddRole />

          {/* LOGIN LOGOUT */}
          {accessToken ? (
            <UserLogout>Log Out</UserLogout>
          ) : (
            <UserLogin>Log In</UserLogin>
          )}

          <DarkMode />
        </Stack>
      </GridItem>

      {/* USER LIST */}
      <GridItem area="list">
        <UserList userQuery={userQuery} />
      </GridItem>

      {/* PAGINATION */}
      <GridItem area="page">
        <Box>
          {userQuery.page === 1 ?
            <Button variant="plain" color="grey"> <MdArrowBack /> </Button>
            :
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={prevPage}> <MdArrowBack /> </Button>
          }
          {users.length === 12 ?
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={nextPage}> <MdArrowForward /> </Button>
            :
            <Button variant="plain" color="grey"> <MdArrowForward /> </Button>
          }
        </Box>
      </GridItem>
    </>
  );
}

export default TeamPanel;
