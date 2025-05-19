<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Login: POST /api/login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'correoadmi'   => 'required|email',
            'passwordadmi' => 'required|string',
        ]);

        if (!Auth::attempt([
            'correoadmi'   => $credentials['correoadmi'],
            'password'     => $credentials['passwordadmi'],
        ])) {
            return response()->json(['message'=>'Credenciales inválidas'], 401);
        }

        $request->session()->regenerate();

        return response()->json(Auth::user(), 200);
    }

    // Logout: POST /api/logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message'=>'Sesión cerrada'], 200);
    }

    // Obtener usuario autenticado: GET /api/user
    public function user(Request $request)
    {
        return response()->json($request->user(), 200);
    }
}
