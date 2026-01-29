import { Button, Container, Input } from '@/components';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router';
import { paths } from '@/utils/constants';

type Inputs = {
    username: string;
    password: string;
    passwordConfirm: string;
};

const schema = yup
    .object({
        username: yup.string().required().min(3).max(20),
        password: yup.string().required().min(4).max(40),
        passwordConfirm: yup
            .string()
            .required()
            .min(4)
            .max(40)
            .oneOf([yup.ref('password')], 'Passwords must match'),
    })
    .required();

export const Register = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        toast.info(`${data.username} profile created`);
        setUser({
            uid: crypto.randomUUID(),
            username: data.username,
            password: data.password,
            profilePicture: [],
            history: [],
        });
        reset();
        navigate(paths.home);
    };

    return (
        <section className="relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] h-125 w-125 rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] h-100 w-100 rounded-full bg-green-500/20 blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] h-150 w-150 rounded-full bg-red-500/10 blur-[150px]" />
            </div>

            <Container>
                <div className="min-h-screen flex flex-col justify-center items-center">
                    <h2 className="mb-5 text-neutral-300 text-2xl">Registration</h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-100 w-full grid gap-2 p-8 border border-neutral-600/60 shadow-[inset_0_1px_2px_rgb(113,113,113)] bg-neutral-600/30 backdrop-blur-sm rounded-[17px]">
                        <Input autoComplete="username" placeholder="Enter username" {...register('username')} />
                        <p className="text-red-500">{errors.username?.message}</p>

                        <Input autoComplete="new-password" placeholder="Enter password" {...register('password')} />
                        <p className="text-red-500">{errors.password?.message}</p>

                        <Input
                            autoComplete="new-password"
                            placeholder="Repeat password"
                            {...register('passwordConfirm')}
                        />
                        <p className="text-red-500">{errors.passwordConfirm?.message}</p>

                        <Button variant="outline">Send</Button>
                    </form>
                </div>
            </Container>
        </section>
    );
};
