<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model {
    protected $table = 'articles';
    protected $fillable = [
        'user_id', 'category_id', 'title', 'slug', 'excerpt',
        'content', 'cover_image_url', 'status', 'views'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
