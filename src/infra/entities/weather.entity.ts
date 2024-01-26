import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  city: string;

  @Column('varchar', { length: 255, nullable: true })
  country: string;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lon: number;

  @Column('varchar', { length: 255, nullable: true })
  weather_main: string;

  @Column('varchar', { length: 255, nullable: true })
  weather_description: string;

  @Column({ type: 'decimal', nullable: true })
  weather_temp: number;

  @Column({ type: 'decimal', nullable: true })
  weather_feels_like: number;

  @Column({ type: 'decimal', nullable: true })
  weather_temp_min: number;

  @Column({ type: 'decimal', nullable: true })
  weather_temp_max: number;

  @Column({ type: 'integer', nullable: true })
  weather_pressure: number;

  @Column({ type: 'integer', nullable: true })
  weather_humidity: number;

  @CreateDateColumn({ name: 'createdate' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updated_date: Date;
}
