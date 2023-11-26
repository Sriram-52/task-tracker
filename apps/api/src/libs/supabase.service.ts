import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly _client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this._client = createClient(
      this.configService.get('supabase.url'),
      this.configService.get('supabase.key'),
    );
  }

  get client() {
    return this._client;
  }
}
