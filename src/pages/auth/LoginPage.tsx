import { z } from "zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Paper, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { useAuthStore } from "../../store/auth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Min 8 characters"),
});
type Form = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuthStore();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(loginSchema) });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Form) => {
    setErr(null); 
    setLoading(true);
    try {
      await login(data.email, data.password);
      const to = loc.state?.from?.pathname ?? "/dashboard";
      nav(to, { replace: true });
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 380, mx: "auto", mt: 8 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 5 }}>Regula</Typography>
      <Typography variant="h5" mb={3}>Login</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" disabled={loading}>Continue</Button>
          <Typography variant="body2" color="text.secondary" pt={1}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
}
