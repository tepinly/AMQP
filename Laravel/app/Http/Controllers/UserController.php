<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        if (count($users) > 0) {
            return $users;
        } else return "Users table is currently empty.";
    }

    public function show(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if ($user != null) {
            return $user;
        } else return "No user with such an ID.";
    }
}
