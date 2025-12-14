<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdPlacement extends Model {
    protected $table = 'ad_placements';
    protected $fillable = ['placement_key', 'label', 'ad_code', 'is_active'];
    protected $casts = [
        'is_active' => 'boolean'
    ];
}
