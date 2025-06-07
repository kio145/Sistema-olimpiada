<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Competencia;

class CompetenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ASTRONOMÍA - ASTROFÍSICA
        Competencia::create([
            'idcompetencia'     => 1,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '3P',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: fases de la Luna, planetas del sistema solar, constelaciones visibles en 3er grado de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 2,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '4P',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: el Sol y sus características, eclipses, sistema planetario, estrellas principales, para 4to de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 3,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '5P',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: galaxias, Vía Láctea, fases de Venus, telescopios básicos y nociones de gravedad para 5to de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 4,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '6P',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: estructura del universo, vida de las estrellas, agujeros negros introductorios y trayectoria de cometas para 6to de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 5,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '1S',
            'preciocompetencia' => 10,
            'descripcion'       => 'Temas: teoría del Big Bang, órbitas planetarias, astronomía estelar y tipos de telescopios para 1ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 6,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '2S',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: evolución estelar, nebulosas, cúmulos galácticos y características de exoplanetas para 2do de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 7,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '3S',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: cosmología básica, materia oscura, energía oscura y técnicas de observación con telescopios avanzados para 3ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 8,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '4S',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: métricas del universo, teoría de la relatividad aplicada, estructuras a gran escala y historia de la astronomía para 4to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 9,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '5S',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: formación estelar, agujeros negros supermasivos, cosmología moderna y métodos de espectroscopía para 5to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 10,
            'idadmi'            => 1,
            'areacompetencia'   => 'ASTRONOMÍA - ASTROFÍSICA',
            'nivelcompetencia'  => '6S',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: teorías avanzadas de gravitación, dinámica de galaxias, instrumentos de astrofísica de vanguardia y astrobiología para 6to de secundaria.',
            'imagencompetencia' => null,
        ]);

        // BIOLOGÍA
        Competencia::create([
            'idcompetencia'     => 11,
            'idadmi'            => 1,
            'areacompetencia'   => 'BIOLOGÍA',
            'nivelcompetencia'  => '2S',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: células (estructura y función), clasificación de seres vivos, ecosistemas básicos para 2do de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 12,
            'idadmi'            => 1,
            'areacompetencia'   => 'BIOLOGÍA',
            'nivelcompetencia'  => '3S',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: genética mendeliana, ADN y ARN, principios de herencia y mutaciones para 3ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 13,
            'idadmi'            => 1,
            'areacompetencia'   => 'BIOLOGÍA',
            'nivelcompetencia'  => '4S',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: biología molecular, procesos metabólicos, fotosíntesis y respiración celular para 4to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 14,
            'idadmi'            => 1,
            'areacompetencia'   => 'BIOLOGÍA',
            'nivelcompetencia'  => '5S',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: anatomía y fisiología humana, sistemas de órganos, homeostasis y salud pública para 5to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 15,
            'idadmi'            => 1,
            'areacompetencia'   => 'BIOLOGÍA',
            'nivelcompetencia'  => '6S',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: ecología avanzada, biodiversidad, biotecnología y conservación de especies endémicas para 6to de secundaria.',
            'imagencompetencia' => null,
        ]);

        // FÍSICA
        Competencia::create([
            'idcompetencia'     => 16,
            'idadmi'            => 1,
            'areacompetencia'   => 'FÍSICA',
            'nivelcompetencia'  => '4S',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: cinemática en una dimensión, vectores, leyes de Newton y aplicaciones en movimiento para 4to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 17,
            'idadmi'            => 1,
            'areacompetencia'   => 'FÍSICA',
            'nivelcompetencia'  => '5S',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: trabajo y energía, energía potencial y cinética, conservación de la energía y sistemas mecánicos para 5to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 18,
            'idadmi'            => 1,
            'areacompetencia'   => 'FÍSICA',
            'nivelcompetencia'  => '6S',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: termodinámica (leyes, ciclos), electricidad y magnetismo básicos, óptica geométrica y nociones de física moderna para 6to de secundaria.',
            'imagencompetencia' => null,
        ]);

        // INFORMÁTICA
        Competencia::create([
            'idcompetencia'     => 19,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Guacamayo',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: fundamentos de computación, hardware básico, uso responsable de software educativo y redes locales para 5º–6º de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 20,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Guanaco',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: algoritmos y pseudocódigo, estructuras de control (if, while), introducción a la programación en Python para 1º–3º de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 21,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Londra',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: lógica booleana, variables y tipos de datos, depuración de código y resolución de problemas sencillos en Python para 1º–3º de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 22,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Jucumari',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: estructuras de datos básicas (listas, diccionarios), funciones y módulos en Python, bases de datos básicas para 4º–6º de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 23,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Bufeo',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: principios de redes de computadoras, protocolos básicos (HTTP, TCP/IP), seguridad informática inicial para 1º–3º de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 24,
            'idadmi'            => 1,
            'areacompetencia'   => 'INFORMÁTICA',
            'nivelcompetencia'  => 'Puma',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: programación orientada a objetos en Python, desarrollo web básico (HTML, CSS, JavaScript) para 4º–6º de secundaria.',
            'imagencompetencia' => null,
        ]);

        // MATEMÁTICAS
        Competencia::create([
            'idcompetencia'     => 25,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Primer Nivel',
            'preciocompetencia' => 15,
            'descripcion'       => 'Temas: operaciones básicas con números enteros, fracciones y decimales, nociones de álgebra introductoria para 1ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 26,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Segundo Nivel',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: ecuaciones lineales, desigualdades, sistemas de ecuaciones 2×2 y gráficos en el plano para 2do de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 27,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Tercer Nivel',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: funciones y sus representaciones, polinomios, factorización y resolución de ecuaciones cuadráticas para 3ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 28,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Cuarto Nivel',
            'preciocompetencia' => 35,
            'descripcion'       => 'Temas: geometría analítica, vectores en el plano, trigonometría básica y áreas de figuras planas para 4to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 29,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Quinto Nivel',
            'preciocompetencia' => 40,
            'descripcion'       => 'Temas: cálculo diferencial básico (límites, derivadas), aplicaciones de la derivada y secuencias numéricas para 5to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 30,
            'idadmi'            => 1,
            'areacompetencia'   => 'MATEMÁTICAS',
            'nivelcompetencia'  => 'Sexto Nivel',
            'preciocompetencia' => 40,
            'descripcion'       => 'Temas: cálculo integral introductorio, técnicas de integración, aplicaciones de área bajo la curva y razones de cambio para 6to de secundaria.',
            'imagencompetencia' => null,
        ]);

        // QUÍMICA
        Competencia::create([
            'idcompetencia'     => 31,
            'idadmi'            => 1,
            'areacompetencia'   => 'QUÍMICA',
            'nivelcompetencia'  => '2S',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: estructura atómica, tabla periódica, enlaces químicos y nomenclatura básica para 2do de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 32,
            'idadmi'            => 1,
            'areacompetencia'   => 'QUÍMICA',
            'nivelcompetencia'  => '3S',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: reacciones químicas, balanceo de ecuaciones, leyes de los gases y soluciones químicas para 3ro de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 33,
            'idadmi'            => 1,
            'areacompetencia'   => 'QUÍMICA',
            'nivelcompetencia'  => '4S',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: estequiometría, termodinámica química, cinética básica y equilibrio químico para 4to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 34,
            'idadmi'            => 1,
            'areacompetencia'   => 'QUÍMICA',
            'nivelcompetencia'  => '5S',
            'preciocompetencia' => 35,
            'descripcion'       => 'Temas: química orgánica introductoria (hidrocarburos, grupos funcionales), reacciones orgánicas básicas para 5to de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 35,
            'idadmi'            => 1,
            'areacompetencia'   => 'QUÍMICA',
            'nivelcompetencia'  => '6S',
            'preciocompetencia' => 40,
            'descripcion'       => 'Temas: bioquímica básica (proteínas, carbohidratos, lípidos), química analítica introductoria y métodos de laboratorio para 6to de secundaria.',
            'imagencompetencia' => null,
        ]);

        // ROBÓTICA
        Competencia::create([
            'idcompetencia'     => 36,
            'idadmi'            => 1,
            'areacompetencia'   => 'ROBÓTICA',
            'nivelcompetencia'  => 'Builders P',
            'preciocompetencia' => 20,
            'descripcion'       => 'Temas: construcción básica de robots con bloques, conceptos de transmisión de movimiento y sensores sencillos para 5º–6º de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 37,
            'idadmi'            => 1,
            'areacompetencia'   => 'ROBÓTICA',
            'nivelcompetencia'  => 'Builders S',
            'preciocompetencia' => 25,
            'descripcion'       => 'Temas: programación en entornos visuales (p.ej. Scratch for Robots), lógica de control, sensores básicos y toma de decisiones para 1º–6º de secundaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 38,
            'idadmi'            => 1,
            'areacompetencia'   => 'ROBÓTICA',
            'nivelcompetencia'  => 'Lego P',
            'preciocompetencia' => 30,
            'descripcion'       => 'Temas: montaje de kits LEGO básicos, programación de movimientos simples, comportamiento de motores y diseño de trayectos para 5º–6º de primaria.',
            'imagencompetencia' => null,
        ]);
        Competencia::create([
            'idcompetencia'     => 39,
            'idadmi'            => 1,
            'areacompetencia'   => 'ROBÓTICA',
            'nivelcompetencia'  => 'Lego S',
            'preciocompetencia' => 35,
            'descripcion'       => 'Temas: programación avanzada en entornos LEGO Mindstorms, integración de sensores (ultrasonido, color), planificación de misiones autónomas para 1º–6º de secundaria.',
            'imagencompetencia' => null,
        ]);
    }
}
