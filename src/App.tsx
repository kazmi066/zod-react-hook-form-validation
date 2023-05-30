import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./components/inputField";

const formSchema = z
  .object({
    username: z.string().max(100).optional(),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

type FormSchemaType = z.infer<typeof formSchema>;

const App = () => {
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> =  (data) => {
    console.log(data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                id="username"
                label="Your username"
                type="text"
                register={register}
                error={errors.username} />
              <InputField
                id="email"
                label="Your email"
                type="email"
                register={register}
                error={errors.email}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
              />
              <InputField
                id="confirmPassword"
                label="Confirm password"
                type="password"
                register={register}
                error={errors.confirmPassword}
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms")}
                  />
                  {errors.terms && (
                    <span className="text-red-800 block mt-2">
                      {errors.terms?.message}
                    </span>
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
