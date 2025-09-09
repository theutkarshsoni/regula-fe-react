import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Paper, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { useAuthStore } from "../../store/auth";

const registerSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.email(),
  password: z.string().min(8, "Min 8 characters")
});
type Form = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: signup } = useAuthStore();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(registerSchema) });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Form) => {
    setErr(null); 
    setLoading(true);
    try {
      await signup(data.name, data.email, data.password, 'analyst');
      nav("/dashboard", { replace: true });
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 5 }}>Regula</Typography>
      <Typography variant="h5" mb={3}>Register</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Full name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" disabled={loading}>Continue</Button>
          <Typography variant="body2" color="text.secondary" pt={1}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
}
