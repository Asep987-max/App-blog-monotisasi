<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $table = 'users';
    protected $fillable = ['google_id', 'email', 'full_name', 'role'];

    public function articles() {
        return $this->hasMany(Article::class);
    }
}
