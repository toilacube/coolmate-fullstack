<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Notifications\ResetPasswordRequest;

class PasswordResetController extends Controller
{
    //
    public function forgotPassword(Request $request)
    {

        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return "Password reset token sent successfully";

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    public function resetPassword(Request $request)
    {
        // $request->validate([
        //     'email' => 'required|email',
        //     'token' => 'required',
        //     'newPassword' => 'required',
        // ]);

        $email = $request->input('email');
        $password = $request->input('newPassword');
        $token = $request->input('token');

        $status = Password::reset(
            compact('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                    // 'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password has been reset'], 200)
            : response()->json(['message' => 'Unable to reset password'], 400);
    }
}
