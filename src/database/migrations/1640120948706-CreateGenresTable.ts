import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGenreTable1640120948706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "genres",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ]
      }));


      await queryRunner.createTable(new Table({
        name: "games_genres",
        columns: [
          { name: "gameId", type: "uuid" },
          { name: "genreId", type: "uuid" },
        ]
      }));

      const foreignKeyGames = new TableForeignKey({
        columnNames: ["gameId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE" 
      })

      const foreignKeyGenres = new TableForeignKey({
        columnNames: ["genreId"],
        referencedColumnNames: ["id"],
        referencedTableName: "genres",
        onDelete: "CASCADE" 
      })

      await queryRunner.createForeignKey("games_genres", foreignKeyGames)
      await queryRunner.createForeignKey("games_genres", foreignKeyGenres)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("games_genres");

      await queryRunner.dropTable("genres");
    }

}
